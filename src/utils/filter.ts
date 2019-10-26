export default class Filter {
  static userFilter(user) {
    const exclude: string[] = ['password', 'salt'];

    const ret = {};
    for (const p in user) {
      if (!user.hasOwnProperty(p)) {
        continue;
      }

      const has =
        exclude.findIndex(e => {
          return e === p;
        }) !== -1;

      if (has) {
        continue;
      }

      ret[p] = user[p];
    }

    return ret;
  }
}
