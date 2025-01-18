import { NextResponse } from "next/server";
import { ServiceFactory } from "../../services/factory";
import { errorHandler, APIError } from "../../middleware/error-handler";

export async function POST(req: Request) {
  try {
    const { query, language } = await req.json();

    if (!query) {
      throw new APIError("Query is required", 400);
    }

    const orchestrator = ServiceFactory.getInstance().getOrchestrator();
    const results = await orchestrator.search(query, language);
    
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
