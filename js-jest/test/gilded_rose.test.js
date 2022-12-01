const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose - update quality", () => {
  describe("basic items", () => {
    it("should handle the basic lifecycle", () => {
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

    it("should never have a negative quality", () => {
      const gildedRose = new Shop([new Item("foo", 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should limit quality to 50 at initialisation", () => {
      const gildedRose = new Shop([new Item("foo", 20, 90)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(19);
      expect(items[0].quality).toBe(49);
    });

    it("should degrade quality twice as fast after sellBy date", () => {
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
  });

  describe("aged brie", () => {
    it("should increase in quality", () => {
      const gildedRose = new Shop([
        new Item("Aged Brie", 10, 10),
        new Item("Aged Brie", 20, 25),
        new Item("Aged Brie", 0, 11),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(11);
      expect(items[1].sellIn).toBe(19);
      expect(items[1].sellIn).toBe(19);
      expect(items[2].sellIn).toBe(-1);
      expect(items[2].quality).toBe(13);
    });

    it("should limit quality to 50 at initialisation", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 20, 90)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(19);
      expect(items[0].quality).toBe(50);
    });

    it("should limit quality to 50 at update", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 20, 50)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(19);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("sulfuras", () => {
    it("should be qualtiy 80 and it never alters", () => {
      // TODO: check for Sulfuras inside the name, not this exact string
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 10, 10),
        new Item("Sulfuras, Hand of Ragnaros", 20, 40),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
      expect(items[1].sellIn).toBe(20);
      expect(items[1].quality).toBe(80);
      expect(items[2].sellIn).toBe(0);
      expect(items[2].quality).toBe(80);
    });
  });

  describe("backstage passes", () => {
    it("should limit quality to 50 at initialisation", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 90),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(19);
      expect(items[0].quality).toBe(50);
    });

    it("should increase in quality", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 12, 11),
        new Item("Backstage passes to a TAFKAL80ETC concert", 30, 19),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(11);
      expect(items[0].quality).toBe(12);
      expect(items[1].sellIn).toBe(29);
      expect(items[1].quality).toBe(20);
    });

    it("should increase by 2 when there are 10 days left to sell", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(12);
    });

    it("should increase by 3 when there are 5 days left to sell", () => {
      // TODO: check for Sulfuras inside the name, not this exact string
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(23);
    });

    it("should drop to 0 after the concert", () => {
      // TODO: check for Sulfuras inside the name, not this exact string
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
