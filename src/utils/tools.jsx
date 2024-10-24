export default function stripHtmlTagsUsingInnerHTML(input) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = input;
  return tempElement.textContent || tempElement.innerText || "";
}
