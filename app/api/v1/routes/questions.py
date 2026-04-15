"""Question routes."""

from typing import Any

from fastapi import APIRouter, status

from app.services.assessment_service import AssessmentService
from app.utils.response import success_response

router = APIRouter()
assessment_service = AssessmentService()


@router.get("", status_code=status.HTTP_200_OK)
async def list_questions() -> dict[str, Any]:
    """Return all fixed assessment questions ordered for display."""
    data = await assessment_service.list_questions()
    return success_response("Questions fetched successfully.", {"questions": data})
