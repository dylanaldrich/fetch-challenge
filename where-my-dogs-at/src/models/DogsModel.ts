/* Backend server URL */
const baseUrl = 'https://frontend-take-home-service.fetch.com';

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  from?: string;
  sort?: string;
  next?: string;
  size?: number;
}

export interface DogSearchResponse {
  next: string;
  resultIds: string[];
  total: number;
}

export interface Dog {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

class DogsModel {
  static searchDogs = async (
    searchParams?: DogSearchParams,
  ): Promise<DogSearchResponse> => {
    const urlSearchParams = searchParams
      ? this.getUrlSearchParams({
          ...searchParams,
          sort: searchParams.sort || 'breed:asc',
        })
      : new URLSearchParams();
    const path = searchParams?.next
      ? searchParams.next
      : `/dogs/search?${urlSearchParams}`;
    const response = await fetch(baseUrl + path, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // redirect to home page
      window.location.href = '/';
      throw new Error('That action is unauthorized.');
    }

    if (response.status !== 200) {
      throw new Error('Login attempt failed. Please try again.');
    }

    const data = await response.json();

    return data;
  };

  static getBreeds = async (): Promise<{ name: string }[]> => {
    const response = await fetch(`${baseUrl}/dogs/breeds`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // redirect to home page
      window.location.href = '/';
      throw new Error('That action is unauthorized.');
    }

    if (response.status !== 200) {
      throw new Error(
        "Couldn't fetch breeds. Ha! See what I did there? Please try again.",
      );
    }

    const breeds = await response.json();

    return breeds.map((breed: string) => ({ name: breed }));
  };

  static getDogs = async (dogIds: string[]): Promise<Dog[]> => {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
    });

    if (response.status === 401) {
      // redirect to home page
      window.location.href = '/';
      throw new Error('That action is unauthorized.');
    }

    if (response.status !== 200) {
      throw new Error(
        "Couldn't fetch dogs. Ha! See what I did there? Please try again.",
      );
    }

    const data = await response.json();

    return data;
  };

  static getMatch = async (dogIds: string[]): Promise<Dog> => {
    const matchResponse = await fetch(`${baseUrl}/dogs/match`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
    });

    if (matchResponse.status === 401) {
      // redirect to home page
      window.location.href = '/';
      throw new Error('That action is unauthorized.');
    }

    if (matchResponse.status !== 200) {
      throw new Error(
        "Couldn't fetch your match. Ha! See what I did there? Please try again.",
      );
    }

    const { match: matchId } = await matchResponse.json();

    const matches = await this.getDogs([matchId]);

    return matches[0];
  };

  static populateDogs = async (
    searchParams?: DogSearchParams,
  ): Promise<{ dogs: Dog[]; next: string }> => {
    const { resultIds, next } = await this.searchDogs(searchParams);

    if (!resultIds) {
      throw new Error('Sorry, something went wrong. Try again later.');
    }

    const dogs = await this.getDogs(resultIds);

    if (!dogs) {
      throw new Error('Sorry, something went wrong. Try again later.');
    }

    return { dogs, next };
  };

  static getUrlSearchParams = (
    searchParams: DogSearchParams,
  ): URLSearchParams => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.append(key, String(value));
      }
    });

    return params;
  };
}

export default DogsModel;
