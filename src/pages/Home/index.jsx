import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ContactsList from './components/ContactsList';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';
import { Container } from './styles';
import useHome from './useHome';

export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDelete,
    contacts,
    searchTerm,
    filteredContacts,
    orderBy,
    hasError,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleToggleOrderBy,
    handleTryAgain,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            contactBeingDelete={contactBeingDelete}
            isLoadingDelete={isLoadingDelete}
            isDeleteModalVisible={isDeleteModalVisible}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
            onCloseDeleteModal={handleCloseDeleteModal}
            onConfirmDeleteContact={handleConfirmDeleteContact}
          />

          <Modal
            danger
            title={`Tem certeza que deseja remover o contato ”${contactBeingDelete?.name}”? `}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
