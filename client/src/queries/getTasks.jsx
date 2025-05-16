export async function getTasks() {
  const result = await fetch("http://localhost:1337/api/tasks?populate=*",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 74526e377a9a488b5a437d18f5d8c3b81d8c53b3c8c6449962394d15ffef586537d5ef106790ff18bb6cc99bf87147693dbf3a76b3b3559d658d66b146837a70a9363929ae9a91ff548b1d6ac891b042f2c4456613d59b6ed8abf4699aa5fd56f2e68f4315971f421dee8e6c47045b7e19af543adf140682d140d9580771ba71
`,
    },
  });

  const data = await result.json();
  return data.data;
}
