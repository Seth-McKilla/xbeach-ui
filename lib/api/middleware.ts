import type {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { unstable_getServerSession as getServerSession } from "next-auth/next";
import type { Session } from "next-auth";

import { authOptions } from "@/lib/nextauth";

export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export type NextApiRequestAuthenticated = NextApiRequest & {
  user: Session["user"];
};

export const apiHandler = (handler: { [key in Method]?: NextApiHandler }) => {
  return async (req: NextApiRequestAuthenticated, res: NextApiResponse) => {
    if (!handler[req.method]) {
      return res.status(405).json({
        error: {
          code: "method-not-allowed",
          message: `${req.method} method not allowed.`,
        },
      });
    }

    try {
      req.user = null;
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user) {
        return res.status(401).json({
          data: null,
          error: {
            code: "unauthorized",
            message: "You are not authenticated.",
          },
        });
      }

      req.user = session.user;

      return handler[req.method](req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: {
          code: "server-error",
          message: "There was an error while authenticating.",
        },
      });
    }
  };
};
