class JSONTransformer {
  transform(chunk: ArrayBufferView, controller: ReadableByteStreamController) {
    try {
      controller.enqueue(JSON.parse((chunk as any) as string))
    } catch (e) {
      controller.enqueue(chunk)
    }
  }
}

export default JSONTransformer
