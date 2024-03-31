export const readTime = (content) => {
    const averageReading = 225;
  
    const div = document.createElement("div");
    div.innerHTML = content.__html;
  
    const textContext = div.textContent || div.innerHTML;
    const words = textContext.trim().split(/\s+/);
    return Math.ceil(words.length / averageReading);
  };