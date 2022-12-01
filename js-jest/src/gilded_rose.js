class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

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

function getItemType(item) {
  if (item.name.startsWith("Conjured")) return ITEM_TYPE.CONJURED;
  if (item.name.startsWith("Aged Brie")) return ITEM_TYPE.AGED_BRIE;
  if (item.name.startsWith("Sulfuras")) return ITEM_TYPE.SULFURAS;
  if (item.name.startsWith("Backstage passes"))
    return ITEM_TYPE.BACKSTAGE_PASSES;
  // else
  return ITEM_TYPE.NORMAL;
}

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

function updateConjuredItem(item) {
  if (item.sellIn <= 0) {
    // degrade twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.max(item.quality - 4, MIN_QUALITY),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.max(item.quality - 2, MIN_QUALITY),
  };
}

function updateNormalItem(item) {
  if (item.sellIn <= 0) {
    // degrade twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.max(item.quality - 2, MIN_QUALITY),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.max(item.quality - 1, MIN_QUALITY),
  };
}

function updateAgedBrie(item) {
  if (item.sellIn <= 0) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 2, MAX_QUALITY),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(item.quality + 1, MAX_QUALITY),
  };
}

function updateBackstagePasses(item) {
  if (item.sellIn <= 0) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: MIN_QUALITY,
    };
  }

  if (item.sellIn <= 5) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 3, MAX_QUALITY),
    };
  }

  if (item.sellIn <= 10) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 2, MAX_QUALITY),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(item.quality + 1, MAX_QUALITY),
  };
}

function updateSulfuras(item) {
  // never alter
  return item;
}

module.exports = {
  Item,
  Shop,
};
