class Item {
  constructor(name, sellIn, quality) {
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

class Shop {
  constructor(items = []) {
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

module.exports = {
  Item,
  Shop,
};

/*
 * This function is used to prepare the item before it is used in the shop.
 */
function prepareItem(item) {
  if (item.name.startsWith(ITEM_TYPE.SULFURAS)) {
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

function updateConjuredItem(item) {
  // degrade twice as fast as normal item
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality - 4);
  else return updateDailyValues(item, item.quality - 2);
}

function updateNormalItem(item) {
  // degrade twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality - 2);
  else return updateDailyValues(item, item.quality - 1);
}

function updateAgedBrie(item) {
  // increase twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, item.quality + 2);
  else return updateDailyValues(item, item.quality + 1);
}

function updateBackstagePasses(item) {
  // increase twice as fast
  if (item.sellIn <= 0) return updateDailyValues(item, MIN_QUALITY);

  // increase twice as fast
  if (item.sellIn <= 5) return updateDailyValues(item, item.quality + 3);

  // increase twice as fast
  if (item.sellIn <= 10) return updateDailyValues(item, item.quality + 2);
  else return updateDailyValues(item, item.quality + 1);
}

function updateSulfuras(item) {
  // never alter
  return item;
}

/*
 * Helper functions
 */
function updateDailyValues(item, newQuality) {
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(MAX_QUALITY, Math.max(newQuality, MIN_QUALITY)),
  };
}

function getItemType(item) {
  if (item.name.startsWith("Conjured")) return ITEM_TYPE.CONJURED;
  if (item.name.startsWith("Aged Brie")) return ITEM_TYPE.AGED_BRIE;
  if (item.name.startsWith("Sulfuras")) return ITEM_TYPE.SULFURAS;
  if (item.name.startsWith("Backstage passes"))
    return ITEM_TYPE.BACKSTAGE_PASSES;
  // else
  return ITEM_TYPE.NORMAL;
}
