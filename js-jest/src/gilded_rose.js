class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.items = items.map(prepareItem);
  }

  updateQuality() {
    const newItems = this.items.map((item) => {
      switch (item.name) {
        case "Aged Brie":
          return updateAgedBrie(item);
        case "Sulfuras, Hand of Ragnaros":
          return updateSulfuras(item);
        case "Backstage passes to a TAFKAL80ETC concert":
          return updateBackstagePasses(item);
        default:
          return updateBasicItem(item);
      }
    });

    this.items = newItems;
    return this.items;
  }
}

function prepareItem(item) {
  if (item.name === "Sulfuras, Hand of Ragnaros") {
    return {
      ...item,
      quality: 80,
    };
  } else {
    return {
      ...item,
      quality: Math.min(50, Math.max(0, item.quality)),
    };
  }
}

function updateBasicItem(item) {
  if (item.sellIn <= 0) {
    // degrade twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.max(item.quality - 2, 0),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.max(item.quality - 1, 0),
  };
}

function updateAgedBrie(item) {
  if (item.sellIn <= 0) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 2, 50),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(item.quality + 1, 50),
  };
}

function updateBackstagePasses(item) {
  if (item.sellIn <= 0) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: 0,
    };
  }

  if (item.sellIn <= 5) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 3, 50),
    };
  }

  if (item.sellIn <= 10) {
    // increase twice as fast
    return {
      ...item,
      sellIn: item.sellIn - 1,
      quality: Math.min(item.quality + 2, 50),
    };
  }

  // else
  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality: Math.min(item.quality + 1, 50),
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
