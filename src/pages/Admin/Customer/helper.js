import _get from "lodash/get";
export const formatBirthday = (info) => {
  return _get(info, "birthday", "31011999").replace(
    /^(\d{4})(\d{2})(\d{2})$/,
    "$1-$2-$3"
  );
};

export const formatBirthday2 = (info) => {
  return _get(info, "birthday", "31011999").replace(
    /^(\d{2})(\d{2})(\d{4})$/,
    "$3-$2-$1"
  );
};

export const roleEnum = {
  MANAGER: "Manager",
  EMPLOYEE: "Employee",
};
