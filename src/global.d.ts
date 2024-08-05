// global.d.ts
interface Postcode {
  new (options: {
    oncomplete: (data: any) => void
    onresize?: (size: any) => void
    onsearch?: (data: any) => void
  }): Postcode
  open(): void
}

interface Window {
  daum: {
    Postcode: Postcode
  }
}
