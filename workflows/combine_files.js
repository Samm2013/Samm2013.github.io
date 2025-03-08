async function fetchYamlFile(owner, repo, path) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.error('Error fetching YAML file:', error);
  }
}

// Usage example
const owner = 'Samm2013';
const repo = 'Samm2013.github.io';
const path = 'main/workflows/connect_files.yml';

fetchYamlFile(owner, repo, path)
  .then(content => {
    console.log('YAML file content:', content);
    // Process the YAML content here
  });
