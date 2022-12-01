const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose - update quality", () => {
  it("should handle the basic item lifecycle", () => {
    const gildedRose = new Shop([
      new Item("foo", 10, 50),
      new Item("bar", 5, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(49);

    expect(items[1].name).toBe("bar");
    expect(items[1].sellIn).toBe(4);
    expect(items[1].quality).toBe(19);
  });

  it("should never update to a negative quality", () => {
    const gildedRose = new Shop([new Item("bar", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should degrade quality twice as fast after sellByDate", () => {
    const gildedRose = new Shop([
      new Item("bar", 0, 45),
      new Item("kow", 0, 0),
      new Item("net", 0, 1),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(43);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(0);
  });

  it("should handle limit the quality to 50", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 20, 50),
      new Item("Aged Brie", 20, 90),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(50);

    // TODO: add this test after initial test suite setup
    // expect(items[1].sellIn).toBe(19);
    // expect(items[1].quality).toBe(50);
  });

  // TODO: check for quality 50 limit at construction
  // new Item("foo", 0, 90),

  it("should handle 'Aged Brie' to age twice as fast", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 10, 10),
      new Item("Aged Brie", 20, 25),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
    expect(items[1].sellIn).toBe(19);
    expect(items[1].quality).toBe(26);
  });

  it("should handle 'Sulfuras' to age twice as fast", () => {
    // TODO: check for Sulfuras inside the name, not this exact string
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 10),
      new Item("Sulfuras, Hand of Ragnaros", 20, 40),
      // TODO: check for quality 50 limit at construction
      // new Item("Sulfuras, Hand of Ragnaros", 20, 60),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(10);
    expect(items[1].sellIn).toBe(20);
    expect(items[1].quality).toBe(40);
  });

  it("should handle 'Backstage passes'", () => {
    // TODO: check for Sulfuras inside the name, not this exact string
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      // TODO: check for quality 50 limit at construction
      // new Item("Backstage passes to a TAFKAL80ETC concert", 20, 60),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
    expect(items[1].sellIn).toBe(4);
    expect(items[1].quality).toBe(23);
  });
});
