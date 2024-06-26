import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { Flex, FlexItem, PanelBody, PanelRow, TextControl, RangeControl } from '@wordpress/components';
import blockData from './block.json';

export default function Edit({ attributes, setAttributes }) {

  const { numOfColumns, borderRadius, pricingCards, gap } = attributes;

  const flexItems = pricingCards.map((card, index) => (
    <FlexItem
      className='flex-item'
      style={{ borderRadius: borderRadius }}
      key={index}
    >
      <RichText
        tagName='h3'
        value={card.title}
        onChange={(title) => updatePricingCard(index, { ...card, title })}
      />
      <p>
        <RichText
          value={card.content}
          onChange={(content) => updatePricingCard(index, { ...card, content })}
        />
      </p>
    </FlexItem>
  ));

  const updatePricingCard = (index, updatedCard) => {
    const newCards = [...pricingCards];
    newCards[index] = updatedCard;
    setAttributes({ pricingCards: newCards });
  };

  const modifyNumberOfCards = (count) => {

    const currentNumberOfCards = pricingCards.length;
    const defaultCard = blockData.attributes.pricingCards.default[0];

    if (count > pricingCards.length) {
      const additionalNumberOfCards = count - currentNumberOfCards;
      const newCards = Array.from({ length: additionalNumberOfCards }, () => ({
        'title': defaultCard.title,
        'pricie': '',
        'content': defaultCard.content
      }));

      setAttributes({
        pricingCards: [...pricingCards, ...newCards],
        numOfColumns: pricingCards.length + additionalNumberOfCards
      });
    } else {
      setAttributes(
        {
          pricingCards: pricingCards.slice(0, count),
          numOfColumns: count
        });
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RangeControl
              label={__('Number of cards', 'pricing-table-block')}
              value={numOfColumns}
              onChange={(count) => modifyNumberOfCards(count)}
              min={1}
              max={6}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label='Border Radius'
              value={borderRadius}
              onChange={(borderRadius) => setAttributes({ borderRadius })}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label='Gap'
              value={gap}
              onChange={(gap) => {
                console.log('----gap ', gap)
                setAttributes({ gap })
              }}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <Flex {...useBlockProps({ attributes })}
        align='center'
        justify='center'
        gap={gap}
      >
        {flexItems}
      </Flex>
    </>
  );
}
