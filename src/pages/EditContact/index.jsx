import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import toast from '../../helpers/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    (async () => {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    })();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
