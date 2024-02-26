export type message = {
  to: number;
  message: string;
  messageType: messageType;
};

enum messageType {
  'ROOM' = 1,
  'personage' = 2,
}
