import { TextEncoder, TextDecoder } from "util";
import { TransformStream, ReadableStream, WritableStream } from "node:stream/web";

Object.assign(global, { TextEncoder, TextDecoder, TransformStream, ReadableStream, WritableStream, BroadcastChannel: class BroadcastChannel { } });

import "whatwg-fetch";
