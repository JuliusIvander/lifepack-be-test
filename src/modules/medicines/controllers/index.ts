import medicineServices from "../use-cases";
import { makePostUserMedicine } from "./post-user-medicine";
import { makePutUserMedicine } from "./put-user-medicine";

const postUserMedicine = makePostUserMedicine({
  useCase: medicineServices.addMedicine,
});

const putUserMedicine = makePutUserMedicine({
  useCase: medicineServices.updateMedicine,
});

export default Object.freeze({
  postUserMedicine,
  putUserMedicine,
});
