import { NextRequest, NextResponse } from "next/server";
import { ServiceFactory } from "../../services/factory";
import { errorHandler, APIError } from "../../middleware/error-handler";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { dirPath, language } = await req.json();

    if (!dirPath) {
      throw new APIError("Directory path is required", 400);
    }

    const orchestrator = ServiceFactory.getInstance().getOrchestrator();
    const result = await orchestrator.processAndStore(dirPath, language);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
