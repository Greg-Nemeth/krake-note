import markdownit from 'markdown-it';

const md = markdownit();

onmessage = async (e) => {
  const handle = e.data[0];
  const file = await handle.getFile();
  const text = await file.text()
  console.log(text);
  const m = md.render(text);
  console.log(m);
  self.postMessage(m);
}
