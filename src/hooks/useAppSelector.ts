
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../services';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;