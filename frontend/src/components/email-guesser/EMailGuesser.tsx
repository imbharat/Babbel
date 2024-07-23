import axios from "axios";
import { FormEvent, useState } from "react";

function EMailGuesser() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = (): boolean => {
    const spaceRegex = /\s/;
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,})$/;
    if (!firstName || !lastName) {
      setError("First name and last name cannot be empty.");
      return false;
    }
    if (spaceRegex.test(firstName) || spaceRegex.test(lastName)) {
      setError("First name and last name should not contain spaces.");
      return false;
    }
    if (!domainRegex.test(domain) || (domain.match(/\./g) || []).length !== 1) {
      setError(
        "Domain should contain one and only one dot and only alphanumeric characters."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLButtonElement>,
    apiEndpoint: string
  ) => {
    e.preventDefault();
    setEmail("");
    setError("");

    if (validateFields()) {
      setLoading(true);
      const queryParams = new URLSearchParams({
        name: `${firstName} ${lastName}`,
        domain: domain.toLowerCase(),
      }).toString();

      try {
        const response = await axios.get(`${apiEndpoint}?${queryParams}`);
        if (response?.data?.email) setEmail(response.data.email);
        else setError("Unable to derive email");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage =
            err.response.data?.error || "An unexpected error occurred.";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="component">
      <h1>Email Guesser</h1>
      <div className="content-wrapper">
        <div className="content">
          <div>
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <div className="btn-group">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={(e) =>
                    handleSubmit(e, "http://localhost:8000/api/v1/users/email")
                  }
                  disabled={loading}
                >
                  Guess Email (Slow)
                </button>
                <button
                  type="button"
                  onClick={(e) =>
                    handleSubmit(
                      e,
                      "http://localhost:8000/api/v1/users/email-fast"
                    )
                  }
                  disabled={loading}
                >
                  Guess Email (Fast)
                </button>
              </div>
            </form>
          </div>
          <div>
            {loading && <p>Loading...</p>}
            {email && <p>Derived Email: {email}</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
        <div className="side-note">
          <aside className="note">
            <p>
              <strong>Note:</strong> Suggestion is to use the{" "}
              <strong>fast method</strong> first (though it might sometimes not
              be able to derive the email from live data). If the fast method
              does not yield results, try the <strong>slow method</strong>. The
              difference can be significant in large datasets.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EMailGuesser;
