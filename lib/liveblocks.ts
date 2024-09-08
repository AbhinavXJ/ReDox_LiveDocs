import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY as string ,
  });

  //"sk_dev_OP2X3c-FoqatlDos4v6LR_kL5zO1OX964gP3vLPkSqY4HbUb4T8DtlQhXCEBHFvg"