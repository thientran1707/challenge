export default function action(type, data = {}) {
  return { type, ...data };
}
