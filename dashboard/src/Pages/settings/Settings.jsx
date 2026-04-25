import { useEffect, useState } from "react";
import PageHeader from "../../Components/App/PageHeader";
import { ErrorState, LoadingState } from "../../Components/App/AsyncState";
import SectionCard from "../../Components/App/SectionCard";
import { apiRequest } from "../../lib/api";
import { getDashboardPrefix, getStoredRole, isSuperAdminRole } from "../../lib/auth";
import { useApi } from "../../hooks/useApi";

export default function Settings() {
  const prefix = getDashboardPrefix();
  const isSuperAdmin = isSuperAdminRole(getStoredRole());

  const settingsMenu = useApi(`/dashboard/${prefix}/settings`, {}, [prefix]);
  const superadminProfile = useApi(
    "/dashboard/superadmin/settings/profile",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const superadminCompany = useApi(
    "/dashboard/superadmin/settings/company",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const superadminScope = useApi(
    "/dashboard/superadmin/settings/scope",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const passwordMeta = useApi(
    "/dashboard/superadmin/settings/change-password",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const privacy = useApi(
    "/dashboard/superadmin/settings/privacy-policy",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const terms = useApi(
    "/dashboard/superadmin/settings/terms-and-conditions",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const about = useApi(
    "/dashboard/superadmin/settings/about-us",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );
  const faqs = useApi(
    "/dashboard/superadmin/faqs",
    { enabled: isSuperAdmin },
    [isSuperAdmin],
  );

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    role: "",
    contact_number: "",
    employee_id: "",
    profile_image_url: "",
  });
  const [companyForm, setCompanyForm] = useState({
    company_name: "",
    company_address: "",
    company_logo_url: "",
  });
  const [scopeForm, setScopeForm] = useState({
    department: "",
    team: "",
    role: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [legalForms, setLegalForms] = useState({
    privacy: { title: "", content: "", image_url: "" },
    terms: { title: "", content: "", image_url: "" },
    about: { title: "", content: "", image_url: "" },
  });
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    order: 0,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const source = isSuperAdmin
      ? superadminProfile.data
      : settingsMenu.data?.profile_information?.fields;
    setProfileForm({
      name: source?.name || "",
      email: source?.email || "",
      role: source?.role || "",
      contact_number: source?.contact_number || "",
      employee_id: source?.employee_id || "",
      profile_image_url: source?.profile_image_url || "",
    });
  }, [isSuperAdmin, settingsMenu.data, superadminProfile.data]);

  useEffect(() => {
    const source = isSuperAdmin
      ? superadminCompany.data
      : settingsMenu.data?.company_information?.fields;
    setCompanyForm({
      company_name: source?.company_name || "",
      company_address: source?.company_address || "",
      company_logo_url: source?.company_logo_url || "",
    });
  }, [isSuperAdmin, settingsMenu.data, superadminCompany.data]);

  useEffect(() => {
    const source = isSuperAdmin
      ? superadminScope.data
      : settingsMenu.data?.scope_configuration?.selected;
    setScopeForm({
      department: source?.department || "",
      team: source?.team || "",
      role: source?.role || "",
    });
  }, [isSuperAdmin, settingsMenu.data, superadminScope.data]);

  useEffect(() => {
    setLegalForms({
      privacy: {
        title: privacy.data?.title || "",
        content: privacy.data?.content || "",
        image_url: privacy.data?.image_url || "",
      },
      terms: {
        title: terms.data?.title || "",
        content: terms.data?.content || "",
        image_url: terms.data?.image_url || "",
      },
      about: {
        title: about.data?.title || "",
        content: about.data?.content || "",
        image_url: about.data?.image_url || "",
      },
    });
  }, [privacy.data, terms.data, about.data]);

  async function submitPatch(path, body, refetch) {
    setMessage("");
    try {
      const payload = await apiRequest(path, { method: "PATCH", body });
      setMessage(payload?.message || "Saved.");
      await refetch?.();
      await settingsMenu.refetch();
    } catch (err) {
      setMessage(err.message || "Save failed.");
    }
  }

  async function handleFaqSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      const method = editingFaq ? "PATCH" : "POST";
      const path = editingFaq
        ? `/dashboard/superadmin/faqs/${editingFaq._id}`
        : "/dashboard/superadmin/faqs";
      const payload = await apiRequest(path, { method, body: faqForm });
      setMessage(payload?.message || "FAQ saved.");
      setEditingFaq(null);
      setFaqForm({ question: "", answer: "", order: 0 });
      faqs.refetch();
    } catch (err) {
      setMessage(err.message || "FAQ save failed.");
    }
  }

  async function deleteFaq(faqId) {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    setMessage("");
    try {
      await apiRequest(`/dashboard/superadmin/faqs/${faqId}`, {
        method: "DELETE",
      });
      setMessage("FAQ deleted.");
      faqs.refetch();
    } catch (err) {
      setMessage(err.message || "Delete failed.");
    }
  }

  async function submitPassword(event) {
    event.preventDefault();
    setMessage("");
    try {
      const payload = await apiRequest("/users/me/change-password", {
        method: "POST",
        body: passwordForm,
      });
      setMessage(payload?.message || "Password updated.");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      setMessage(err.message || "Password update failed.");
    }
  }

  const loading =
    settingsMenu.loading ||
    (isSuperAdmin && passwordMeta.loading) ||
    (isSuperAdmin &&
      (superadminProfile.loading ||
        superadminCompany.loading ||
        superadminScope.loading ||
        privacy.loading ||
        terms.loading ||
        about.loading ||
        faqs.loading));
  const error =
    settingsMenu.error ||
    (isSuperAdmin && passwordMeta.error) ||
    (isSuperAdmin &&
      (superadminProfile.error ||
        superadminCompany.error ||
        superadminScope.error ||
        privacy.error ||
        terms.error ||
        about.error ||
        faqs.error));
  const passwordSubtitle =
    passwordMeta.data?.subtitle ||
    settingsMenu.data?.password_settings?.subtitle ||
    "Update your password.";

  return (
    <div className="mt-20 space-y-6 p-6">
      <PageHeader title="Settings" subtitle="Live settings and profile management." />

      {loading ? <LoadingState label="Loading settings..." /> : null}
      {error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            settingsMenu.refetch();
            if (isSuperAdmin) {
              passwordMeta.refetch();
            }
            if (isSuperAdmin) {
              superadminProfile.refetch();
              superadminCompany.refetch();
              superadminScope.refetch();
              privacy.refetch();
              terms.refetch();
              about.refetch();
              faqs.refetch();
            }
          }}
        />
      ) : null}
      {message ? (
        <p className="rounded-xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
          {message}
        </p>
      ) : null}

      <SectionCard title="Profile Information">
        <form className="grid gap-4 md:grid-cols-2">
          {Object.keys(profileForm).map((field) => (
            <label key={field} className="text-sm">
              <span className="mb-1 block font-medium capitalize text-slate-700">
                {field.replaceAll("_", " ")}
              </span>
              <input
                value={profileForm[field]}
                onChange={(event) =>
                  setProfileForm({ ...profileForm, [field]: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />
            </label>
          ))}
          <button
            type="button"
            onClick={() =>
              submitPatch(`/dashboard/${prefix}/settings/profile`, profileForm, isSuperAdmin ? superadminProfile.refetch : settingsMenu.refetch)
            }
            className="w-fit rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
          >
            Save profile
          </button>
        </form>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Company Information">
          <form className="grid gap-4">
            {Object.keys(companyForm).map((field) => (
              <label key={field} className="text-sm">
                <span className="mb-1 block font-medium capitalize text-slate-700">
                  {field.replaceAll("_", " ")}
                </span>
                <input
                  value={companyForm[field]}
                  onChange={(event) =>
                    setCompanyForm({ ...companyForm, [field]: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>
            ))}
            <button
              type="button"
              onClick={() =>
                submitPatch(`/dashboard/${prefix}/settings/company`, companyForm, isSuperAdmin ? superadminCompany.refetch : settingsMenu.refetch)
              }
              className="w-fit rounded-xl bg-slate-900 px-4 py-3 text-white"
            >
              Save company
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Scope Configuration">
          <form className="grid gap-4">
            {Object.keys(scopeForm).map((field) => (
              <label key={field} className="text-sm">
                <span className="mb-1 block font-medium capitalize text-slate-700">
                  {field.replaceAll("_", " ")}
                </span>
                <input
                  value={scopeForm[field]}
                  onChange={(event) =>
                    setScopeForm({ ...scopeForm, [field]: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>
            ))}
            <button
              type="button"
              onClick={() =>
                submitPatch(`/dashboard/${prefix}/settings/scope`, scopeForm, isSuperAdmin ? superadminScope.refetch : settingsMenu.refetch)
              }
              className="w-fit rounded-xl bg-slate-900 px-4 py-3 text-white"
            >
              Save scope
            </button>
          </form>
        </SectionCard>
      </div>

      <SectionCard title="Password Settings" subtitle={passwordSubtitle}>
        <form className="grid gap-4 md:grid-cols-3" onSubmit={submitPassword}>
          {Object.keys(passwordForm).map((field) => (
            <label key={field} className="text-sm">
              <span className="mb-1 block font-medium capitalize text-slate-700">
                {field.replaceAll("_", " ")}
              </span>
              <input
                type="password"
                value={passwordForm[field]}
                onChange={(event) =>
                  setPasswordForm({ ...passwordForm, [field]: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />
            </label>
          ))}
          <button className="w-fit rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-3">
            Update password
          </button>
        </form>
      </SectionCard>

      {isSuperAdmin ? (
        <>
          {[
            ["privacy", "Privacy Policy", "/dashboard/superadmin/settings/privacy-policy", privacy.refetch],
            ["terms", "Terms & Conditions", "/dashboard/superadmin/settings/terms-and-conditions", terms.refetch],
            ["about", "About Us", "/dashboard/superadmin/settings/about-us", about.refetch],
          ].map(([key, title, path, refetch]) => (
            <SectionCard key={key} title={title}>
              <div className="grid gap-4">
                {["title", "content", "image_url"].map((field) => (
                  <label key={field} className="text-sm">
                    <span className="mb-1 block font-medium capitalize text-slate-700">
                      {field.replaceAll("_", " ")}
                    </span>
                    {field === "content" ? (
                      <textarea
                        value={legalForms[key][field]}
                        onChange={(event) =>
                          setLegalForms({
                            ...legalForms,
                            [key]: { ...legalForms[key], [field]: event.target.value },
                          })
                        }
                        className="min-h-32 w-full rounded-xl border border-slate-200 px-4 py-3"
                      />
                    ) : (
                      <input
                        value={legalForms[key][field]}
                        onChange={(event) =>
                          setLegalForms({
                            ...legalForms,
                            [key]: { ...legalForms[key], [field]: event.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3"
                      />
                    )}
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => submitPatch(path, legalForms[key], refetch)}
                  className="w-fit rounded-xl bg-slate-900 px-4 py-3 text-white"
                >
                  Save {title}
                </button>
              </div>
            </SectionCard>
          ))}

          <SectionCard title="FAQ Management">
            <div className="space-y-6">
              <form onSubmit={handleFaqSubmit} className="grid gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <h4 className="font-medium text-slate-900">
                  {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                </h4>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Question</span>
                  <input
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    placeholder="Enter question"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Answer</span>
                  <textarea
                    required
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    className="min-h-24 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    placeholder="Enter answer"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-slate-700">Order</span>
                  <input
                    type="number"
                    value={faqForm.order}
                    onChange={(e) => setFaqForm({ ...faqForm, order: parseInt(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>
                <div className="flex gap-2">
                  <button type="submit" className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                    {editingFaq ? "Update FAQ" : "Add FAQ"}
                  </button>
                  {editingFaq && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaq(null);
                        setFaqForm({ question: "", answer: "", order: 0 });
                      }}
                      className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="divide-y divide-slate-100">
                {faqs.data?.map((faq) => (
                  <div key={faq._id} className="flex items-start justify-between py-4">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{faq.question}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{faq.answer}</p>
                      <p className="text-xs text-slate-400">Order: {faq.order}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setFaqForm({
                            question: faq.question,
                            answer: faq.answer,
                            order: faq.order,
                          });
                        }}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteFaq(faq._id)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {(!faqs.data || faqs.data.length === 0) && (
                  <p className="py-8 text-center text-sm text-slate-400">No FAQs found.</p>
                )}
              </div>
            </div>
          </SectionCard>
        </>
      ) : null}
    </div>
  );
}
