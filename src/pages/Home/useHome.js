import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from '../../helpers/toast';
import ContactsService from '../../services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDelete, setContactBenigDelete] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
      ),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBenigDelete(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDelete.id);

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDelete.id),
      );

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDelete,
    contacts,
    searchTerm,
    hasError,
    orderBy,
    filteredContacts,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleToggleOrderBy,
    handleTryAgain,
    handleDeleteContact,
  };
}
