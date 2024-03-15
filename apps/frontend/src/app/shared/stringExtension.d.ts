interface String {
  /**
   * Replaces all matching text in a string, using a search string.
   *
   *@param searchValue — A string to search for.
   *
   *@param replaceValue — A string containing the text to replace.
   */
  replaceAll(searchValue: string, replaceValue: string): string;
}

String.prototype.replaceAll = function (
  subString: string,
  replaceString: string
): string {
  return this.split(subString).join(replaceString);
};
