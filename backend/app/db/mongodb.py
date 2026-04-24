"""MongoDB and Beanie initialization utilities."""

from beanie import init_beanie
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
import certifi

from app.core.config import settings
from app.models.app_setting import AppSetting
from app.models.action_log import LeaderActionLog
from app.models.assessment import CheckIn
from app.models.assessment import DailyCheckIn
from app.models.assessment import MonthlyCheckIn
from app.models.assessment import WeeklyCheckIn
from app.models.behavior import BehaviorLog
from app.models.chat import ChatMessage
from app.models.intervention_memory import InterventionMemory
from app.models.profile import Profile
from app.models.question import Question
from app.models.score import Score
from app.models.user import User
from app.utils.constants import QUESTION_BANK

client: AsyncMongoClient | None = None
database: AsyncDatabase | None = None


async def init_db() -> None:
    """Initialize the MongoDB client and register Beanie document models."""
    global client, database

    client = AsyncMongoClient(
        settings.MONGODB_URL,
        tls=True,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=30000,
    )
    database = client[settings.MONGODB_DB_NAME]

    await init_beanie(
        database=database,
        document_models=[
            User,
            Profile,
            AppSetting,
            LeaderActionLog,
            CheckIn,
            DailyCheckIn,
            WeeklyCheckIn,
            MonthlyCheckIn,
            BehaviorLog,
            ChatMessage,
            InterventionMemory,
            Score,
            Question,
        ],
    )
    await seed_questions()


async def seed_questions() -> None:
    """Seed the fixed 25-question assessment bank if it is missing or outdated."""
    existing_questions = await Question.find_all().sort(Question.order).to_list()
    has_expected_count = len(existing_questions) == len(QUESTION_BANK)
    has_expected_codes = all(
        getattr(question, "code", None) == expected["code"]
        for question, expected in zip(existing_questions, QUESTION_BANK)
    )
    if has_expected_count and has_expected_codes:
        return

    await Question.find_all().delete()
    question_documents = [Question(**question_data) for question_data in QUESTION_BANK]
    await Question.insert_many(question_documents)


def get_database() -> AsyncDatabase:
    """Return the initialized MongoDB database instance."""
    if database is None:
        raise RuntimeError("Database has not been initialized.")
    return database
