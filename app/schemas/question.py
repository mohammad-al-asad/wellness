"""Question response schemas."""

from pydantic import BaseModel


class QuestionRead(BaseModel):
    """Serialized question payload."""

    id: str
    text: str
    driver: str
    response_type: str
    options: list[str]
    weight: float
    order: int
