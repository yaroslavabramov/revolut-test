const getRates = async () => {
  try {
    const response = await fetch(
      'https://openexchangerates.org/api/latest.json?app_id=bb16478b4da442c99aafe75fd3d13158'
    );
    if (response.ok) return await response.json();
    else throw new Error('response is not ok');
  } catch (e) {
    throw new Error(e);
  }
};

export { getRates };
