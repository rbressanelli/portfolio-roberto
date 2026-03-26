import { useEffect, useState } from 'react';
import { defaultContent } from '../data/defaultContent';
import { supabase } from '../lib/supabaseClient';

export function usePortfolioContent() {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('portfolio_data')
          .select('content')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Erro ao buscar dados do Supabase:', error);
          // Fallback para conteúdo padrão
          setContent(defaultContent);
        } else if (data && data.content && Object.keys(data.content).length > 0) {
          setContent(data.content);
        } else {
          setContent(defaultContent);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  const updateContent = async (newContent: any) => {
    setContent(newContent);
    try {
      const { error } = await supabase
        .from('portfolio_data')
        .update({ content: newContent })
        .eq('id', 1);

      if (error) {
        console.error('Erro ao salvar no Supabase:', error);
        alert('Erro ao salvar as alterações no banco de dados!');
      } else {
        alert('Alterações salvas com sucesso!');
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Ocorreu um erro ao salvar as alterações.');
    }
  };

  const resetContent = async () => {
    await updateContent(defaultContent);
  };

  return { content, setContent: updateContent, resetContent, loading };
}
