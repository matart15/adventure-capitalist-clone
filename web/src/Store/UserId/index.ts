const USER_ID_STORAGE_KEY = "USER_ID_STORAGE_KEY";
export const saveUserId = ({ userId }: { userId: number }) => {
  localStorage.setItem(USER_ID_STORAGE_KEY, userId.toString());
};

export const getUserId = (): number => {
  return parseInt(localStorage.getItem(USER_ID_STORAGE_KEY) as string);
};
