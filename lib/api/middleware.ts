import type {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const apiHandler = (handler: { [key in Method]?: NextApiHandler }) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!handler[req.method]) {
      return res.status(405).json({
        error: {
          code: "method-not-allowed",
          message: `${req.method} method not allowed.`,
        },
      });
    }

    return handler[req.method](req, res);
  };
};
