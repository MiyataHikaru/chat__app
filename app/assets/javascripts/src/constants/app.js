export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
