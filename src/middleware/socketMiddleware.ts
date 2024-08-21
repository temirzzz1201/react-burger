import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../utils/api';
import { IOrders, IWebSocketMessage } from '../types'; 

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<IWebSocketMessage>, 
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<IOrders>, 
};

interface IAction {
  type: string;
  payload?: any;
}

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware => {
  return ((store: MiddlewareAPI<any, any>) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing = false;

    return next => (action: IAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsDisconnect, wsConnecting } = wsActions;

      if (wsConnect.match(action)) {
        url = payload; 
        if (url) {
          socket = new WebSocket(url);
          dispatch(wsConnecting());

          socket.onopen = () => {
            dispatch(onOpen());
          };

          socket.onerror = (event: Event) => {
            dispatch(onError(event.type));
          };

          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);

            if (parsedData.message === "Invalid or missing token") {
              refreshToken().then(refreshData => {
                const newUrl = new URL(url!);
                newUrl.searchParams.set("token", refreshData.accessToken.replace("Bearer ", ""));
                url = newUrl.toString();
                dispatch(wsConnect(url));
              });
            } else {
              dispatch(onMessage(parsedData));
            }
          };

          socket.onclose = (event: CloseEvent) => {
            dispatch(onClose());
            if (!closing) {
              dispatch(wsConnect(url!));
            }
          };
        }
      }

      if (socket) {
        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(payload));
        }

        if (wsDisconnect.match(action)) {
          closing = true;
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
