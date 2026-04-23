"""Account lifecycle regression tests."""

from types import SimpleNamespace

import pytest

from app.services.account_service import AccountService


@pytest.mark.asyncio
async def test_delete_account_deactivates_user_and_deletes_profile(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Deleting an account should remove both the user and profile records."""
    service = AccountService()
    user = SimpleNamespace(id="user-1")
    deleted_user = SimpleNamespace(id="user-1")
    captured_delete_profile: dict[str, object] = {}

    async def fake_delete_user(user_id: str) -> SimpleNamespace:
        assert user_id == "user-1"
        return deleted_user

    async def fake_delete_by_user_id(user_id: str) -> bool:
        captured_delete_profile["user_id"] = user_id
        return True

    monkeypatch.setattr(service.user_repository, "delete_user", fake_delete_user)
    monkeypatch.setattr(
        service.profile_repository,
        "delete_by_user_id",
        fake_delete_by_user_id,
    )

    response = await service.delete_account(user)

    assert response == {
        "action": "delete_account",
        "detail": "Account deleted successfully.",
    }
    assert captured_delete_profile == {"user_id": "user-1"}
