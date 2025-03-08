using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class AuthManager : MonoBehaviour
{
    public InputField usernameInput;
    public InputField passwordInput;
    public Text errorText;

    // File path for local storage (replace with secure server logic later)
    private string userDataPath;

    void Start()
    {
        userDataPath = Application.persistentDataPath + "/users.json";
    }

    // Called when the user clicks "Sign Up"
    public void OnSignUp()
    {
        string username = usernameInput.text;
        string password = passwordInput.text;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            errorText.text = "Username/password cannot be empty!";
            return;
        }

        // Save user data (insecure example - use encryption for real projects)
        UserData newUser = new UserData(username, HashPassword(password));
        SaveUserData(newUser);

        // Load main game scene
        SceneManager.LoadScene("MainMenu");
    }

    // Called when the user clicks "Login"
    public void OnLogin()
    {
        string username = usernameInput.text;
        string password = passwordInput.text;

        UserData user = LoadUserData(username);
        if (user != null && VerifyPassword(password, user.hashedPassword))
        {
            // Successful login
            SceneManager.LoadScene("MainMenu");
        }
        else
        {
            errorText.text = "Invalid credentials!";
        }
    }

    private void SaveUserData(UserData user)
    {
        string json = JsonUtility.ToJson(user);
        File.WriteAllText(userDataPath, json);
    }

    private UserData LoadUserData(string username)
    {
        if (File.Exists(userDataPath))
        {
            string json = File.ReadAllText(userDataPath);
            return JsonUtility.FromJson<UserData>(json);
        }
        return null;
    }

    // Simple password hashing (use better methods like bcrypt in real projects)
    private string HashPassword(string password)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Encoding.UTF8.GetString(bytes);
        }
    }

    private bool VerifyPassword(string inputPassword, string storedHash)
    {
        return HashPassword(inputPassword) == storedHash;
    }
}

[System.Serializable]
public class UserData
{
    public string username;
    public string hashedPassword;

    public UserData(string username, string hashedPassword)
    {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }
}
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public Text welcomeText;

    void Start()
    {
        // Load username from saved data
        string username = PlayerPrefs.GetString("username");
        welcomeText.text = "Welcome, " + username + "!";
    }

    public void OnLogout()
    {
        PlayerPrefs.DeleteKey("username");
        SceneManager.LoadScene("LoginScene");
    }
}
using UnityEngine.Networking;

IEnumerator PostDataToGitHub(string url, UserData user)
{
    WWWForm form = new WWWForm();
    form.AddField("username", user.username);
    form.AddField("password", user.hashedPassword);

    using (UnityWebRequest www = UnityWebRequest.Post(url, form))
    {
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error: " + www.error);
        }
        else
        {
            Debug.Log("Data saved to GitHub!");
        }
    }
}
