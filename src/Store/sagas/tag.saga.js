import { call, put } from "redux-saga/effects";
import { setTagData } from "../slices/tag.slice";
import tagService from "../../http/services/tag.service";

// Worker
export function* fetchTagSaga() {
  // Call API
  const tags = yield call(tagService.fetchAllTag);

  // Dispatch action để lưu lại data từ API vào store

  // dispatch() dùng trong component
  // put() dùng trong saga
  yield put(setTagData(tags));
}
