export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

/**
 * Constants
 */
const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const QUALITY_SULFURAS = 80;
const ITEM_TYPE = {
  CONJURED: "Conjured",
  AGED_BRIE: "Aged Brie",
  SULFURAS: "Sulfuras",
  BACKSTAGE_PASSES: "Backstage passes",
  NORMAL: "Normal",
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.items = items.map(prepareItem);
  }

  updateQuality() {
    const newItems = this.items.map((item) => {
      switch (getItemType(item)) {
        case ITEM_TYPE.CONJURED:
          return updateConjuredItem(item);
        case ITEM_TYPE.AGED_BRIE:
          return updateAgedBrie(item);
        case ITEM_TYPE.SULFURAS:
          return updateSulfuras(item);
        case ITEM_TYPE.BACKSTAGE_PASSES:
          return updateBackstagePasses(item);
        default:
          return updateNormalItem(item);
      }
    });

    this.items = newItems;
    return this.items;
  }
}

/*
 * This function is used to prepare the item before it is used in the shop.
 */
function prepareItem(item: Item): Item {
  if (getItemType(item) === ITEM_TYPE.SULFURAS) {
    return {
      ...item,
      quality: QUALITY_SULFURAS,
    };
  } else {
    return {
      ...item,
      quality: Math.min(MAX_QUALITY, Math.max(MIN_QUALITY, item.quality)),
    };
  }
}

/**
 * Update functions based on type
 */

function updateConjuredItem(item: Item): Item {
  // degrade twice as fast as normal item
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality - 4);
  else return updateDailyValues(item, item.quality - 2);
}

function updateNormalItem(item: Item): Item {
  // degrade twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality - 2);
  else return updateDailyValues(item, item.quality - 1);
}

function updateAgedBrie(item: Item): Item {
  // increase twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality + 2);
  else return updateDailyValues(item, item.quality + 1);
}

function updateBackstagePasses(item: Item): Item {
  // increase twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, MIN_QUALITY);

  // increase twice as fast
  if (item.sellIn <= 5) return updateDailyValues(item, item.quality + 3);

  // increase twice as fast
  if (item.sellIn <= 10) return updateDailyValues(item, item.quality + 2);
  else return updateDailyValues(item, item.quality + 1);
}

function updateSulfuras(item: Item): Item {
  // never alter
  return item;
}

/*
 * Helper functions
 */
function updateDailyValues(item: Item, newQuality: number): Item {
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(MAX_QUALITY, Math.max(newQuality, MIN_QUALITY)),
  };
}

function getItemType(item: Item): string {
  if (item.name.startsWith("Conjured")) return ITEM_TYPE.CONJURED;
  if (item.name.startsWith("Aged Brie")) return ITEM_TYPE.AGED_BRIE;
  if (item.name.startsWith("Sulfuras")) return ITEM_TYPE.SULFURAS;
  if (item.name.startsWith("Backstage passes"))
    return ITEM_TYPE.BACKSTAGE_PASSES;
  // else
  return ITEM_TYPE.NORMAL;
}
