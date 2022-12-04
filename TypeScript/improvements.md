# Possible improvements without a raging goblin

- [] Add `type` property to Item class
- [] Update `ITEM_TYPE` constant into an `Enum` which is used in `Item.type`
- [] Replace class and OOP style with a simpler function style. E.g.:

  ```
      const items = [
        new Item("foo", 10, 50),
        new Item("bar", 5, 20),
      ];
      const newItems = updateQuality();
  ```

  The class now allows an instance to keep item state. For the sake of this exercise it makes sense but is of no necessity.
