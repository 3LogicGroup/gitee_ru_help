// add dark classname in html element
export const switchDarkClassName = (theme: string) => {
  function switchTheme() {
    try {
      if (theme === 'dark') {
        document.documentElement.classList?.add?.('dark');
      } else {
        document.documentElement.classList?.remove?.('dark');
      }
    } catch (e) {
      console.log(e)
    }
  }

  setTimeout(() => {
    switchTheme();
  }, 0);
};
