class LineBreakTransformer {
  private container: any // TODO

  transform(chunk: ArrayBuffer, controller: ReadableByteStreamController) {
    this.container += chunk
    const lines = this.container.split('\r\n')
    this.container = lines.pop()
    lines.forEach(line => controller.enqueue(line))
  }

  flush(controller: ReadableByteStreamController) {
    controller.enqueue(this.container)
  }
}

export default LineBreakTransformer
