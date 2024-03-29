export function handleError (e: Error): void {
  console.log('error', e)
  if (e.message === 'Network request failed') {
    // Toast.show({ type: "error", text1: "We can't talk to the server" });
  } else {
    // Toast.show({ type: "error", text1: e?.message ?? "An error occured" });
  }
}
