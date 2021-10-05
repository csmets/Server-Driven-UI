import * as React from 'react';
import Image from 'next/image';
import { FeedFavouriteFragment, SaveItemDocument, StateKey, UnsaveItemDocument } from '@csmets/typescript-apollo-sdui-types/types';
import { useMutation } from '@apollo/client';
import { SignalContext } from '../../../provider/signal';

const FeedFavourite = (props: { data: FeedFavouriteFragment }): JSX.Element => {
  const { icon, saveAction, unsaveAction } = props.data;
  const [saveItemMutation, saveResponse] = useMutation(SaveItemDocument);
  const [unsaveItemMutation, unsaveResponse] = useMutation(UnsaveItemDocument);
  const signalContext = React.useContext(SignalContext);
  const { registerSignal, emitSignal } = signalContext;
  let [svg, setSvg] = React.useState(icon);
  const signalId = saveAction?.signal?.signalId || "";
  const { subscribe } = registerSignal({ signalId });
  const [save, setSave] = React.useState(true)

  React.useEffect(() => {
    if (subscribe && subscribe.result) {
      switch (subscribe.result?.key) {
        case StateKey.Error:
          setSvg(icon);
        default:
          break;
      }
    }
  }, [subscribe]);

  React.useEffect(() => {
    if (saveResponse.data && saveResponse.data.save) {
      const { signals } = saveResponse.data.save;
      emitSignal({
        signalId: signals[0].signalId,
        key: signals[0].key
      });
    }
  }, [saveResponse.data]);

  React.useEffect(() => {
    if (unsaveResponse.data && unsaveResponse.data.unsave) {
      const { signals } = unsaveResponse.data.unsave;
      emitSignal({
        signalId: signals[0].signalId,
        key: signals[0].key
      });
    }
  }, [unsaveResponse.data]);

  const onClick = () => {
    const feedId = saveAction?.feedId || "";
    if (save) {
      saveItemMutation({
        variables: {
          feedId
        }
      });

      saveAction?.signal?.states?.map((state) => {
        if (state.key == StateKey.Saved && state.value) {
          setSvg(state.value);
        }
      });

      setSave(false);
    } else {
      unsaveItemMutation({
        variables: {
          feedId
        }
      });

      unsaveAction?.signal?.states?.map((state) => {
        if (state.key == StateKey.Unsaved && state.value) {
          setSvg(state.value);
        }
      });

      setSave(true);
    }
  }

  if (saveResponse.error || unsaveResponse.error) {
    console.error(saveResponse.error || unsaveResponse.error);
  }

  if (saveResponse.loading || unsaveResponse.loading) {
    console.log('waiting on mutation response');
  }

  return (
    <div>
      <a onClick={onClick}>
        <Image src={svg || ""} alt="Favourite picture" width="20px" height="20px" />
      </a>
    </div>
  );
}

export {
    FeedFavourite
}