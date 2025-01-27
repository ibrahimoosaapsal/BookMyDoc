import { wallData } from "../dto/axios.dto";

export function isIdInList(
  list: wallData[],
  id: string,
) {
  return list.some(item => item.id === id);
}
