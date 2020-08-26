import {useState, useEffect} from 'react';

import {
  getAllCategories,
  getCreditCategories,
  getDebitCategories,
  getInitCategories,
} from '../services/Categories';

const useCategories = () => {
  const [debitCategories, setDebitCategories] = useState();
  const [creditCategories, setCreditCategories] = useState();
  const [allCategories, setAllCategories] = useState();
  const [initCategories, setInitCategories] = useState();

  useEffect(() => {
    const loadDebitCategories = async () => {
      const data = await getDebitCategories();
      setDebitCategories(data);
    };

    const loadCreditCategories = async () => {
      const data = await getCreditCategories();
      setCreditCategories(data);
    };

    const loadAllCategories = async () => {
      const data = await getAllCategories();
      setAllCategories(data);
    };

    const loadInitCategories = async () => {
      const data = await getInitCategories();
      setInitCategories(data);
    };

    loadDebitCategories();
    loadCreditCategories();
    loadAllCategories();
    loadInitCategories();
  }, []);

  return [debitCategories, creditCategories, allCategories, initCategories];
};

export default useCategories;