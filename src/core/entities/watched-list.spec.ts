import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('watchList', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('should be able to remove items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3, 4]);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([4]);
  });

  it('should be able to add an item if that was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3, 4]);

    list.remove(4);
    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it('should be able to remove an item if that was added before', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it('should be able to update watched list items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
