export default interface IBaseData<T> {
  get(): Promise<T>;
}

export const IBaseDataProivder = "IBaseDataProivder";
