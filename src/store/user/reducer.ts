import { SET_USER_INFO } from './constants';
import { VISITOR_NAME } from '@/common/constants/user';

// eslint-disable-next-line no-shadow
export enum RoleEnum {
  ADMIN = 0,
  VISITOR = 1,
}

interface StateType {
  user: string;
  role: number;
}

interface ActionType {
  type: string;
  payload: StateType;
}

const initState: StateType = {
  user: VISITOR_NAME,
  role: RoleEnum.VISITOR,
};

// eslint-disable-next-line default-param-last
const userReducer = (state: StateType = initState, { type, payload }: ActionType) => {
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default userReducer;
